var pubkey;
var subkey;
function output(inp) {
	document.getElementById("code").innerHTML = inp;
   
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/*function keys() {
 console.log("in the keys");
 pubkey = $("#pub").val();
 subkey = $("#sub").val();
 }

var button = PUBNUB.$('buttonsub');
			var pubnub = PUBNUB.init({
			publish_key   : $("#pub").val(),
			subscribe_key : $("#sub").val(),
			origin : "pubsub-beta.pubnub.com"
		})
		*/
	
var button = PUBNUB.$('buttonsub');

	var pubnub = PUBNUB.init({
			publish_key   : $("#pub").val(),
			subscribe_key : $("#sub").val(),
			origin : "pubsub-beta.pubnub.com"
		})
	$("buttonsub").click(button);
		

 
var my_object_id = 'betaHome';
 
var game = pubnub.get_synced_object({
    callback : function(m) {
        console.log('sync updates');
        
        var str = JSON.stringify(game, undefined, 4);

		output(syntaxHighlight(str));
    	console.log("game.light",game.data.light);
    	if(game.data.light == 1){
    	console.log(document.getElementById("light_img").src);
    		document.getElementById("light_img").src = "images/lighton.png";
            document.getElementById("light_img").dataset.icon = "lighton"
        }
        else{
        	document.getElementById("light_img").src = "images/light.png";
            document.getElementById("light_img").dataset.icon = "light"
        }
        
        if(game.data.music == 1){
    		document.getElementById("music_img").src = "images/musicon.png";
            document.getElementById("music_img").dataset.icon = "musicon"
        }
        else{
        	document.getElementById("music_img").src = "images/music.png";
            document.getElementById("music_img").dataset.icon = "music"
        }
        
        if(game.data.garage == 1){
    		document.getElementById("garage_img").src = "images/garageopen.png";
            document.getElementById("garage_img").dataset.icon = "garageon"
        }
        else{
        	document.getElementById("garage_img").src = "images/garage.png";
            document.getElementById("garage_img").dataset.icon = "garage"
        }
        
        if(game.data.door == 1){
    		document.getElementById("door_img").src = "images/dooropen.png";
            document.getElementById("door_img").dataset.icon = "dooron"
        }
        else{
        	document.getElementById("door_img").src = "images/door.png";
            document.getElementById("door_img").dataset.icon = "door"
        }
        
    },
    error : function(a, b, c) {
        console.log('sync error');
    },
    object_id : my_object_id
});
 
 

 
 
 
// Need to wait before "game" object is ready.
// Filed a bug asking for a "ready" callback from get_synced_object
setTimeout(function() {
    console.log('game finished');
    console.log(game.a);
 
    setTimeout(function() {
        // Merge
        pubnub.merge({
            callback : function(m) {
                console.log('write request finished');
                console.log(game);
 
                // Delete
                setTimeout(function() {
                    pubnub.merge({
                        callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                            
                        },
                        object_id : my_object_id,
                        path : " "
                    });
                }, 1000);
            },
            error : function(m) {
                console.log('write request error');
                console.log(JSON.stringify(m));
            },
            object_id : my_object_id,
            data : {
                "first" : "Bob",
                "last" : "Jetson"
                
            }
        });
    }, 1000);
 
}, 3000);


function changelight() {
// if the light.src == on, make if off and call a merge and change the music to 0.
// else, make it 1.


	if(document.getElementById("light_img").dataset.icon == "light")
	{
	document.getElementById("light_img").dataset.icon = "lighton";
		pubnub.merge({
                        callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        "light":1,
                        	"msg" : "The light turned on"
                        	}
                    });
	}
	else
	{
		document.getElementById("light_img").dataset.icon = "light";
		pubnub.merge({
    	                    callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        	"light":0,
                        	"msg" : "The light turned off"
                        	}
                    });
	}
	
}

function changemusic() {



	if(document.getElementById("music_img").dataset.icon == "music")
	{
	document.getElementById("music_img").dataset.icon = "musicon";
		pubnub.merge({
                        callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        "music":1,
                        	"msg" : "The music turned on"
                        	}
                    });
	}
	else
	{
		document.getElementById("music_img").dataset.icon = "music";
		pubnub.merge({
    	                    callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        	"music":0,
                        	"msg" : "The music turned off"
                        	}
                    });
	}
	

}

function changegarage() {
if(document.getElementById("garage_img").dataset.icon == "garage")
	{
	document.getElementById("garage_img").dataset.icon = "garageon";
		pubnub.merge({
                        callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        "garage":1,
                        	"msg" : "The garage is open"
                        	}
                    });
	}
	else
	{
		document.getElementById("garage_img").dataset.icon = "garage";
		pubnub.merge({
    	                    callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        	"garage":0,
                        	"msg" : "The garage is closed"
                        	}
                    });
	}
}

function changedoor() {
if(document.getElementById("door_img").dataset.icon == "door")
	{
	document.getElementById("door_img").dataset.icon = "dooron";
		pubnub.merge({
                        callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        "door":1,
                        	"msg" : "The door is unlocked"
                        	}
                    });
	}
	else
	{
		document.getElementById("door_img").dataset.icon = "door";
		pubnub.merge({
    	                    callback : function(m) {
                            console.log('write request finished');
                            console.log(game);
                        },
                        error : function(m) {
                            console.log('write request error');
                        },
                        object_id : my_object_id,
                        data : {
                        	"door":0,
                        	"msg" : "The door is locked"
                        	}
                    });
	}
}
