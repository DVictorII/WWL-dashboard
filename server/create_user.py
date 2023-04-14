import sys
from datetime import datetime
import psycopg2
from werkzeug.security import generate_password_hash

dbname = 'wwlengineering_rossing'
user = 'wwlengineering_admin_rossing'
password = 'yf=R(qH7Q#fG'
host = 'localhost'

def dbconnect():
    conn = psycopg2.connect(host=host,
                            database=dbname,
                            user=user,
                            password=password)
    return conn

if __name__ == "__main__":
    today = datetime.today()
    print('\n')
    print('%s Running: %s'%(today,sys.argv[0]))
    _name = sys.argv[1]
    _username = sys.argv[2]
    _password = sys.argv[3]
    if len(sys.argv)>4:
        _picture = sys.argv[4]
    else:
        _picture = "undraw_profile.svg"
    con = dbconnect()
    cur = con.cursor()
    if _name and _username and _password:
        _hashed_password = generate_password_hash(_password)
        query = "INSERT INTO users(username, password, name, picture) VALUES (%s,%s,%s,%s)"
        cur.execute(query,(_username,_hashed_password,_name,_picture))
        con.commit()
        """if len(data) == 0:
            
        else:
            print("user created")"""