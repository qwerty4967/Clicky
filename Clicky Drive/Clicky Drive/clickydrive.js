var ClickyDrive =
{
	
	game:undefined,
        versionString:"Clicky Drive v0.1.1.145 ",
	versionAppend:"",
	versionWatermark:undefined,
	vWatermarkX:0, // in 'pixels'
	vWatermarkY:0,
	vWatermarkStyle:{ fontFamily: '"Arial"', fontSize:'12pt', color:'white', strokeThickness:0 },
    aspectRatio:16/9,
	
	background:undefined,
	ui:undefined,

	resources:
	{
		//nothing, but don't worry.
	},
	
	preload: function()
	{ 
		console.log(ClickyDrive.versionString);
		
		if(ClickyDrive.background!=undefined)
		{
			this.load.image('bg',ClickyDrive.background ); 
		}
		
		if(ClickyDrive.ui!=undefined)
		{
			this.load.html('ui', ClickyDrive.ui);
		}
	},
		

	create:function()
	{
		
		//background
		if(ClickyDrive.background!=undefined)
		{
			ClickyDrive.background = this.add.image(800,450, 'bg'); // must be in 16:9 aspect ratio.
			
			if (ClickyDrive.aspectRatio != ClickyDrive.background.width/ClickyDrive.background.height)
			{
			   throw "Background Aspect Ratio MUST be " + ClickyDive.aspectRatio +" width/height!"
			}
			// resize the background.
			ClickyDrive.background.setScale(config.scale.height/ClickyDrive.background.height);
		}
		
		
		
		// add in a dom
		if(ClickyDrive.ui!=undefined)
		{
			this.add.dom(0,0).createFromHTML(this.cache.html.get('ui'));
		}
		
		// Watermark things properly.
		ClickyDrive.versionWatermark = this.add.text(ClickyDrive.vWatermarkX, ClickyDrive.vWatermarkY, ClickyDrive.versionString+ClickyDrive.versionAppend, ClickyDrive.vWatermarkStyle);
    	ClickyDrive.versionWatermark.originX=-.5; // make it easier to deal with
		ClickyDrive.versionWatermark.originY=-.5;

	},
	
	update:function()
	{

		//sweet nothing...
		for  ( item in ClickyDrive.resources)
		{
		
			ClickyDrive.resources[item].amount+= ClickyDrive.resources[item].perSecond/60;
		}
	},

	
	
	// constructor
	resource:function( name, locationX, locationY, picture, clickable, particle, amountAvailible,)
	{
		this.name = name;
		this.location = {locationX,locationY,};
		this.imgString=picture; // we will require multiple images, but for now...
		this.clickable=clickable;
		this.totalAmountAvailible=amountAvailible;
		this.amountAvailible=amountAvailible;
		ClickyDrive.resources[name]=this;
		this.amount=this.amountAvailible;
		this.perSecond=0;
		this.perClick=1;
		this.add=function(toAdd)
		{
			this.amountAvailible+=toAdd;
			
			this.totalAmountAvailible=this.amountAvailible;
		}
	}
	
	
}

// config is last because the functions are defined in an object
config =
{
   type: Phaser.AUTO,
   autoCenter: true,
   dom:{createContainer: true},
   parent: 'phaser-parent',
   scale: 
   {
  	// this would have taken a lot of work to get working, but phaser did it for me!
	// How kind.
	// not like I already did most of that work.
	// nope.
   	mode: Phaser.Scale.FIT,
	parent: 'phaser-parent',
   	width: 1600,
   	height: 900,
   },
	
   scene: 
   {
	preload: ClickyDrive.preload,
        create: ClickyDrive.create,
        update: ClickyDrive.update
   }
	
	
}