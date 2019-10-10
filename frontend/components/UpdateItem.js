import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'
import Error from './ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!,
        $description: String!,
        $image: String,
        $largeImage: String,
        $price: Int!
    
    ){
        createItem(    
        title: $title
        description: $description 
        image: $image
        largeImage: $largeImage
        price: $price 
    ){
        id
    }
}
`

export default class CreateItem extends Component {
    
    state={
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    }

    handleChange = (e) =>{
        const {name, type, value} = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({[name]: val})
    }

    uploadFile = async (e) => {
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'sickfits')
        
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/kattenelvis/image/upload', 
            {method:'POST', body:data})
        const file = await res.json()
        this.setState({
            image: file.secure_url,
            largeImage:file.eager[0].secure_url
        })
    }
    
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} 
            variables={this.state}>
            {(createItem, {loading, error}) => (

            <Form onSubmit={async (e) =>{
                e.preventDefault();
                const res = await createItem()
                
            }}>
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="file">
                        File
                        <input type="file" 
                        id="file" 
                        name="file" 
                        placeholder="File" 
                        required 
                        value={this.state.file}
                        onChange={this.uploadFile}></input>
                        
                    </label>
                    {this.state.image && <img width="200px" src={this.state.image} alt="Upload Preview"/>}
                    <label htmlFor="title">
                        Title
                        <input type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Title" 
                        required 
                        value={this.state.title}
                        onChange={this.handleChange}></input>
                        
                    </label>
                    <label htmlFor="price">
                        Price
                        <input type="text" 
                        id="price" 
                        name="price" 
                        placeholder="Price" 
                        required 
                        value={this.state.price}
                        onChange={this.handleChange}></input>
                        
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea type="text" 
                        id="description" 
                        name="description" 
                        placeholder="Enter a Description" 
                        required 
                        value={this.state.description}
                        onChange={this.handleChange}></textarea>
                        
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
                <h2>Sell an item</h2>
            </Form>
            )}
        </Mutation>

        )
    }
}

export {CREATE_ITEM_MUTATION} 