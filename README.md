# A tech shopping website with live translation and connection to ESP32. 

This project was made to give an helping concept for a problem my parents have, which is to make a translating device for deaf people

## what does it do?:
- Connects to ESP32 via google's firebase,
- has full translation capabilities   
- can translate from sign language to hebrew (it sucks dont try it)   
- has a partially working marketplace  

## How It Works
- Uses Firebase Realtime Database to send and receive data from the ESP32  
- Captures hand movements via camera input and converts it to text  
- Displays translated text in real time on the website  
- The Marketplace works partially, just need to add the ordering system.  

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Firebase Realtime Database, Firebase Auth  
- **Hardware:** ESP32 microcontroller  
