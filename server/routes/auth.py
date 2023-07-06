from flask import Blueprint, request, jsonify, session
from flask_cors import cross_origin
from app import db
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash

auth_routes = Blueprint("auth_routes", __name__)


@auth_routes.route("/api/v1/login", methods=["POST"])
@cross_origin()
def login_user():
    attempted_username = request.json["username"]
    attempted_password = request.json["password"]

    userQuery = db.session.execute(
        text(f"SELECT * FROM public.users WHERE username = '{attempted_username}'")
    )

    result = [dict(r._mapping) for r in userQuery]

    print("results", result)

    if len(result) == 0:
        return jsonify({"error": "Unauthorized"}), 401

    user = result[0]

    print("USER", user)

    if not check_password_hash(user["password"], attempted_password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user["user_id"]

    return jsonify({"message": "logged in!", "name": user["name"]})


@auth_routes.route("/api/v1/logout", methods=["POST"])
@cross_origin()
def logout():
    session.pop("user_id")
    return jsonify({"message": "logged out!"})


@auth_routes.route("/api/v1/current-user", methods=["GET"])
@cross_origin()
def current_user_info():
    user_id = session.get("user_id")
    print("SESSION", user_id)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    userQuery = db.session.execute(
        text(f"SELECT * FROM public.users WHERE user_id = '{user_id}'")
    )

    result = [dict(r._mapping) for r in userQuery]

    user = result[0]

    return jsonify(
        {
            "id": user["user_id"],
            "username": user["username"],
            "name": user["name"],
            "picture": user["picture"],
            "user_id": user_id,
        }
    )


@auth_routes.route("/api/v1/user/<id>", methods=["GET"])
@cross_origin()
def get_user_from_id(id):
    userQuery = db.session.execute(
        text(f"SELECT * FROM public.users WHERE user_id = '{id}'")
    )

    result = [dict(r._mapping) for r in userQuery]

    user = result[0]

    return jsonify(
        {
            "id": user["user_id"],
            "username": user["username"],
            "name": user["name"],
            "picture": user["picture"],
            "user_id": id,
        }
    )
