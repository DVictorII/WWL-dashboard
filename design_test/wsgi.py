from new_app import app,dev

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    
    app.run()
    """if dev:
        app.run(debug=True)#,port=5000)
    else:
        #port = int(os.environ.get('PORT', 33507))
        app.run(debug=True)#,port = port)"""

"""sys.path.insert(0, os.path.dirname(__file__))
def app(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    message = 'It works!\n'
    version = 'Python v' + sys.version.split()[0] + '\n'
    response = '\n'.join([message, version])
    return [response.encode()]"""