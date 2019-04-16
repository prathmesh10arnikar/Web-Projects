//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Add extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   */
  constructor(props) {
    super(props);
    //@TODO
	this.state={content:''};
	this.onChange = this.onChange.bind(this);
  }

  //@TODO add code

  //Note that a you can get information on the file being uploaded by
  //hooking the change event on <input type="file">.  It will have
  //event.target.files[0] set to an object containing information
  //corresponding to the uploaded file.  You can get the contents
  //of the file by calling the provided readFile() function passing
  //this object as the argument.

onChange(event) {
	var ab=this;
	var obj = event.target.files[0];
	var content=readFile(obj);
	//console.log(content);
	//this.props.app.setContentName(obj.name);
	
	content.then(function(content) {
		ab.setState({content:content});
		ab.props.app.setContentName(obj.name);
		console.log(obj.name);
		console.log(ab.state.content);
		ab.props.app.ws.addContent(obj.name, ab.state.content);
		// ab.props.app.setContentName(obj.name);
                // ab.setState({content:content});
		
        });
	console.log(content);
	console.log(this.state.content);
	event.preventDefault();
	
  }

  render() {
    //@TODO
	console.log(this.state.content);
	var result10 = this.state.content;
		
	return (
	<div>
	<form>
	<label className="label">
	Choose File:<input className="control" type="file" onChange={this.onChange}/>
	</label>
	<div className="error"></div>
	</form>
	    
	</div>

	);


    return "";
  }

}

module.exports = Add;

/** Return contents of file (of type File) read from user's computer.
 *  The file argument is a file object corresponding to a <input
 *  type="file"/>
 */
async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>  resolve(reader.result);
    reader.readAsText(file);
  });
}
