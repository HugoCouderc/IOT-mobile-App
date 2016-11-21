/**
 * CameraController
 *
 * @description :: Server-side logic for managing Cameras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	myCameras: function (req,res)
 	{
 		Camera.find(
 			{owner: req.param('owner')},
 			function(err, list)
 			{
 				return res.ok(list);
 			}
 			);
 	},

 	myCamRights: function(req,res)
 	{
 		Rights.find(
 			{userID: req.param('userID')},
 			function(err, list)
 			{
 				var cams=[];
 				var perms=[];
 				for(i=0; i<list.length;i++)
 				{
 					cams.push(list[i].camID);
 					perms.push(list[i].permissionlevel);
 				}

 				Camera.find(
 					{id : cams},
 					function(err, list2)
 					{
 						for(j=0; j<list2.length;j++)
 						{
 							list2[j].permission = perms[j];
 						}
 						return res.ok(list2);
 					}
 				);

 			}
 		);
 	},



 	getCamera: function(req,res)
 	{
 		return res.ok(Camera.findOne({
 			id: req.param('id')
 		}).exec(function(err, camera){

 			if(camera){
 			}
 			return camera;
 		}))
 	},




  // var req = {
  //    method: 'POST',
  //    url: camera.adress,
  //    headers: {
  //      'Authorization' : jwtToken
  //    },
  //    data: { angle : req.param('angle') }
  //   }
  //
  //   $http(req).then(function(res){console.log(camera.angle); return res.ok();});
  //

  changeAngle: function(req,res){
    var http = require('request');
  Camera.findOne({id:req.param('id')},function(err,camera){
    if(err)
    console.log(err);
      var request = {
         method: 'POST',
         url: camera.adress+"?angle="+req.param('angle'),
         data: { angle : req.param('angle') }
        }

        http(request).on('response',function(resp){
          console.log(camera.angle);
          return res.ok(camera.angle);
        });
      }


    )
  }

 };
