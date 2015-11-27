$(function(){
	$(".live-tile, .flip-list").not(".exclude").liveTile();

	//2nd..

	var imgs = [   {src:'/images/sample/1tw.gif', alt:'1'},
                   {src:'/images/sample/2tw.gif', alt:'2'},
                   {src:'/images/sample/3tw.gif', alt:'3'},
                   {src:'/images/sample/4tw.gif', alt:'4'},
                   {src:'/images/sample/5tw.gif', alt:'5'},
                   {src:'/images/sample/6tw.gif', alt:'6'},
                   {src:'/images/sample/7tw.gif', alt:'7'},
                   {src:'/images/sample/8tw.gif', alt:'8'},   
                   {src:'/images/sample/9tw.gif', alt:'9'}            
                  ];
$("#flip1").liveTile(
    {
      mode:'flip-list',
      swap:'image',
      frontImages: imgs,
      frontIsRandom: true,
      backImages: imgs,
      backIsBackgroundImage: true,
      backIsInGrid: true,
      backIsRandom:false,
      // every tile in the list should flip every time the delay interval occurs
      alwaysTrigger:true,
      //flip the tiles in sequence
      triggerDelay: function(idx){ return idx * 500; }
    }
);
// a variable to use for the trigger delay direction
var reverse = false;
$("#flip2").liveTile(
    { 
      mode:'flip-list',
      swap:'image',
      frontImages: imgs,
      frontIsBackgroundImage:true,
      frontIsInGrid: true,
      frontIsRandom: false,      
      backImages: imgs,
      // every tile in the list should flip every time the delay interval occurs
      alwaysTrigger:true,
      // top left to bottom right then back again
       triggerDelay: function(idx){ 
          switch(idx){
              case 0:
                   return reverse ? 2000 : 0;
              case 1:
                  return reverse ? 1500 : 500;
              case 2:
                  return 1000;
              case 3:
                  return reverse ? 1500 : 500;
              case 4:
                  return 1000;
              case 5:
                  return reverse ? 500 : 1500;            
              case 6:
                  return 1000;
              case 7:
                  return reverse ? 500 : 1500;
              case 8:{
                  var val = reverse ? 0 : 2000;
                  reverse = !reverse;                                
                  return val;                
              }
              default:
                  return 3000;
          }
        }                                       
      });
});