//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Search extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   */
  constructor(props) {
    super(props);
    //@TODO
	this.state={value: '', result:''};
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	this.onClick = this.onClick.bind(this);
  }

  //@TODO

onChange(event) {
    
    this.setState({value:event.target.value});
  }

onSubmit(event) {
	var a= this;
        console.log(this.state.value);

	//console.log(this.props.app.ws.searchDocs(this.state.value,0));
	//var resultset=this.setState({result:this.props.app.ws.searchDocs(this.state.value, 0)});
	var resultSet=this.props.app.ws.searchDocs(this.state.value, 0);
        resultSet.then(function(result) {
		a.setState({result:result});		
	});
	
	event.preventDefault();
}

onClick(result2,i) {
		console.log(this);
		console.log(result2);
		console.log(i);
		this.props.app.setContentName(this.state.result.results[result2].name);
		event.preventDefault();
		
}

  render() {
    //@TODO
	//console.log(this.state.result);
	const result1 = this.state.result;
	//console.log(result1);
	var result2 = result1.results;
	if (result1) 
	{
	if (result2) 
	{
	var  arr = new Array();
	for(var i=0; i<result2.length; i++)
	{
		//console.log(arr.length);
		const href = result2[i].href;
		const name = result2[i].name;
		const lines = result2[i].lines;
		arr.push(<div className="result">
                  <a className="result-name" onClick={this.onClick.bind(result2,i)} href={href}>{name}</a>
		  <p>{lines}</p>
                  </div>);
	}
	}				
	}
  return (  
  <div>
  <form onSubmit={this.onSubmit}>
	<label>
	<span className="label">Search Terms:</span>
	<span className="control">
	<input id="q" name="q" value={this.state.value}  onChange={this.onChange}/>
	</span>
	</label>
  </form>
	{
        result2 ? arr
	 : ""
	}
  </div>
  );
 
}
}

module.exports = Search;
