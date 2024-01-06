import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function GroupCall() {


    // function randomID(len) {
    //     let result = '';
    //     if (result) return result;
    //     var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    //       maxPos = chars.length,
    //       i;
    //     len = len || 5;
    //     for (i = 0; i < len; i++) {
    //       result += chars.charAt(Math.floor(Math.random() * maxPos));
    //     }
    //     return result;
    //   }
    const userName = localStorage.getItem('registrationusername');
    console.log(userName,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    

    const roomID = localStorage.getItem('fam_name')

      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 346450445;
      const serverSecret = "216cac9087e7922951a25b5e0679e0b6";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString() ,`${userName}` );


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, 
        },
      });
      }


      
  return (
    <div
      
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  )
}

export default GroupCall