/*  log.js 1.1 by SoftMoon WebWare  Oct25, 2014
/*   written by and Copyright © 2014 Joe Golembieski, SoftMoon WebWare

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.
		The original copyright information must remain intact.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program.  If not, see <http://www.gnu.org/licenses/>   */

//  character encoding: UTF-8 UNIX   tab-spacing: 2   word-wrap: no   standard-line-length: 120


SoftMoon.WebWare.Log=function(output_element, url, useBreak)  {
	if (arguments.length===0)  this.toConsole=true;
	else
	if (output_element && output_element.nodeType===Node.ELEMENT_NODE)  this.logElement=output_element;
	else  {
		if (typeof url !== 'string')  url="";
		var doc= (output_element) ? (window.open(url, (typeof output_element == 'string') ? output_element : 'log')).document : document;
	  this.logElement=doc.createElement('pre');
	  if (doc !== document)  doc.body.appendChild(this.logElement)
		useBreak=false;  }
//	if (!this.logElement.hasChildNodes())  this.logElement.appendChild(document.createTextNode(""));
	this.timer=false;
	if (useBreak)  this.lineEnd='<br />\n';
	else  this.lineEnd="\n";  }


SoftMoon.WebWare.Log.prototype.log=
SoftMoon.WebWare.Log.prototype.write=function(text)  {
	if (this.toConsole)  console.log(text);
	if (this.logElement)  {
		var span=document.createElement('span');
		span.appendChild(document.createTextNode(text + this.lineEnd))
		this.logElement.appendChild(span);
		span.scrollIntoView();  }
	if (this.timer)  clearTimeout(this.timer);
	var Logger=this;
	this.timer=setTimeout(function()  {
			if (Logger.toConsole)  console.log('——————————————————');
			if (Logger.logElement)  Logger.logElement.appendChild(document.createTextNode('——————————————————' + Logger.lineEnd));  }
		, 40);   // decreasing may not fully congolmerate related events, increasing may intermix unrelated events (especially for fast typers)
	}


SoftMoon.WebWare.Log.prototype.clear=function()  {
	while (this.logElement.hasChildNodes())  {this.logElement.removeChild(this.logElement.firstChild);}  }
