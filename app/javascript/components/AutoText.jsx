import React from 'react'
import '../../assets/stylesheets/AutoText.scss'
import axios from 'axios';

class AutoText extends React.Component{
    constructor () {
        super();
        this.items = [
            'Jurong',
            'Changi',
            'Choa Chu Kang',
            'Ang Mo Kio',
            'Tanjong Pagar',
        ];
        this.state = {
            suggestions: [],
            text: "",
            outlets: []
        }
    }

    componentDidMount(){

    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0 ){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }) );
    }

    suggestionSelected (value){
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const {suggestions} = this.state;
        if (suggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {suggestions.map ((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    searchResults () {
        const url = '/outlets/search/'+this.state.text;



        axios.get(url)
            .then((response) => {

              console.log("this is the response", response)
              const data = response.data

              this.setState({ outlets: data })

            }).catch((error)=>{
              console.log(error);
            })
    }


    render () {
        const {text} = this.state;



        const url = "/outlets/search/"+this.state.text

        return (
            <div className="autoText-container">
                <div className="row">
                    <div className="col-6 search-area">
                        <h1 className="logo-home">JOMMAKAN</h1>
                        <div className="AutoText">
                            <input className="form-control" value={text} onChange={this.onTextChange} type="text" placeholder="Enter a street name..." />
                            {this.renderSuggestions ()}
                        </div>
                        <a className="Searchbtn btn btn-lg" href={url}>Search</a>
                    </div>
                    <div className="col-6 homepage-pic">
                        <img src={ require('../../assets/images/home-pic.png') } />
                        <h1>Find halal eateries near you</h1>
                    </div>


                </div>





            </div>
        )
    }
}

export default AutoText;