//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Content extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   *  name:Name of document to be displayed.
   */
  constructor(props) {
    super(props);
    //@TODO
	this.state={content:''};
  }

  //@TODO

componentDidMount() {
	let b=this;
    let url = this.props.app.props.ws.docsUrl + '/' + this.props.app.state.contentName;
    //console.log(url);    
    fetch(url)
      .then((response) => response.json())
      .then(content => {b.setState({ content })
	})

}

componentDidUpdate() {
	if(this.props.app.state.contentName.length > 1)
	{
        let b=this;
    let url = this.props.app.props.ws.docsUrl + '/' + this.props.app.state.contentName;
    //console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then(content => {b.setState({ content })
        })
	}
}

 render() {
    //@TODO
	//console.log(this);
	var name = this.props.app.state.contentName;
	//console.log(this.state.content);
        var result5 = this.state.content.content;
    
    return(
    
    <div>
	<h1>{name}</h1>
	<pre>{result5}</pre>
    </div>

    );
    return "";
  }

}

module.exports = Content;
