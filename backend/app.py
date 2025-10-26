from flask import Flask,jsonify,request
from dotenv import load_dotenv
from flask_cors import CORS
import os

from google import genai

load_dotenv()
app = Flask(__name__)
CORS(app) #to change later with react
gemini_api_key = os.getenv('GOOGLE_API_KEY')
client = genai.Client(api_key= gemini_api_key)




@app.route('/api/generate',methods=['POST'])
def getRequest() :
    user_input = request.get_json()
    if not user_input :
        return jsonify({
            'success': False,
            'error' :'No data provided'
        }),400
    
    required_fields = ['topic','tone','contentType','length']
    for field in required_fields:
        if field not in user_input:
            return jsonify({
                'success':False,
                'error':f'Missing requied field {field}'
            }),400



    min_length = 0
    max_length = 0
    if user_input["length"] == "medium" :
        min_length = 100
        max_length = 200
    elif user_input["length"] == "small":
        min_length = 50
        max_length = 100
    else :
            min_length = 200
            max_length = 300

    # fixed quoting to avoid SyntaxError
    ai_prompt = (
        f"Write a {user_input['tone']} {user_input['contentType']} "
        f"about {user_input['topic']} around {min_length} - {max_length} words"
    )
        
        
    try :
        response = client.models.generate_content(
            model="gemini-2.0-flash-001", contents=ai_prompt
        )
        if not response:
            return jsonify({
                'success':False,
                'error':'AI failed to generate content'
            }),500
    except Exception as e:
        return jsonify({
            'error': e,
            'success':False,
        }),500
        
    return jsonify({
        'success': True,
        'response':response.text,
        'wordCount':len(response.text.split()),
        'charCount':len(response.text)

    })
    
        
  



if __name__ == "__main__" :
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

