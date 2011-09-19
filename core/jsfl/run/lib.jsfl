﻿// --------------------------------------------------------------------------------
// run script on selected library items

	(function()
	{
		// check for DOM
			xjsfl.init(this);

		// if a document is open...
			if(dom)
			{
				// grab uri
					var uri		= FLfile.read(fl.scriptURI.replace('/lib.jsfl', '/uri.txt'));
					var path	= FLfile.uriToPlatformPath(uri);

				// exit early if the file doesn't exist
					if( ! FLfile.exists(uri))
					{
						xjsfl.trace('The file "' +path+ '" does not exist');
						return false;
					}

				// variables
					var jsfl	= FLfile.read(uri);

				// loop
					if(jsfl)
					{
						// variables
							var lib		= dom.library;
							var sel		= lib.getSelectedItems();
							var timeline, layers;

						// no need to init twice
							jsfl		= jsfl.replace('xjsfl.init(this)', '');

						// debug
							xjsfl.trace('Running file "' +path+ '" on ' +sel.length+ ' library item(s)...');

						// loop
							for(var i = 0; i < sel.length; i++)
							{
								// open librray item
									xjsfl.output.trace("Updating item '" + sel[i].name + "'")
									lib.editItem(sel[i].name);

								// update globals
									timeline	= dom.getTimeline();
									layers		= timeline.layers;

								// execute script
									eval(jsfl);
							}
					}
					else
					{
						xjsfl.trace('Error running JSFL command');
					}
			}

	})()
