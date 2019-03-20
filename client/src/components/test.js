import React from 'react';
import Flexbox from 'flexbox-react';
import request from 'superagent';

import '../css/Modal.css';

class SaveImg extends React.Component {
  
	constructor(props){
		super(props);
		this.state = {
			imgURL: sessionStorage.getItem('selected-img-url')
		};

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange = (event) => {
		const target = event.target.value;

    const {name,value} = event.target
		this.setState({[name]:value});

  }

  handleSubmit = (event) => {

		event.preventDefault();

		console.log(this.state);

	 	request
	  .post('/api/users')
	  .send(this.state) // sends a JSON post body
	  .end((err, res) => {
	    if(err){
				alert("Image saved.");
				console.log(this.state);
				
	    } else if (res){
				alert("Image not saved.");
				console.log(this.state);
	    }
	  });
	  
  }

  render() {

  	let imgUrl = sessionStorage.getItem('selected-img-url');

    return (
    	<Flexbox className="registration-page">
			<h1>Save this look?</h1>


      		<form onSubmit={this.handleSubmit}>

						<input type="image" src={this.state.imgURL} value={this.state.imgURL} name="img-url" className="img-look" onChange={this.handleChange}/>
            
      			<select name="categories" onChange={this.handleChange}>
							<option value="selected">Please select a category:</option>
							<option value="day-looks">Day Looks</option>
			        <option value="night-looks">Night Looks</option>
			        <option value="creative-looks">Creative Looks</option>
			        <option value="cultural-looks">Cultural Looks</option>
		         </select>

				<input className="register-form" type="submit" value="save" />

			 </form>

	    </Flexbox>

    );
  }
}

export default SaveImg;