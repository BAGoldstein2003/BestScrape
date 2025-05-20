from twilio.rest import Client

def send_message():
    account_sid = 'AC3ac09fd901b4b72452504ad4130f9670'
    auth_token = '3b9731152689ea7dbc4c71806de5fe2c'
    client = Client(account_sid, auth_token)
    
    message = client.messages.create(
    messaging_service_sid='MG83e1e089039a37e3109a893657093325',
    body='Ahoy 👋',
    to='+18777804236'
    )
    print(message.sid)
