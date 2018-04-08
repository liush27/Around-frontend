import React from 'react';
import { Tabs, Spin } from 'antd';
import {API_ROOT, AUTH_PREFIX, GEO_OPTIONS, POS_KEY, TOKEN_KEY} from "../constants";
import $ from 'jquery';
import {Gallery} from "./Gallery";
import {CreatePostButton} from './CreatePostButton';
import {WrappedAroundMap} from './AroundMap';

const TabPane = Tabs.TabPane;

export class Home extends React.Component{
    state = {
        loadingGeoLocation : false,
        loadingPosts: false,
        error: '',
        posts:[],
    }

    // lifecycle function 不需要箭头函数,因为他们都绑定好了
    componentDidMount () {
        this.setState({loadingGeoLocation: true, error:'',});
        this.getGeoLocation();
    }

    getGeoLocation(){
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition( // async request
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            );
        } else {
            /* geolocation IS NOT available */
            this.setState({error: 'Your browser does not support geolocation'});
        }
    }

    onSuccessLoadGeoLocation = (position) =>{
        console.log(position);
        this.setState({
            loadingGeoLocation: false,
            error:'',
        });
        const {latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY,JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearByPosts();
    }

    onFailedLoadGeoLocation =() =>{
        this.setState({
            loadingGeoLocation: false,
            error: 'failed to load geo location!'
        });
    }

    getGalleryPanelContent = () => {
        if(this.state.error){
            return <div>{this.state.error}</div>
        }else if(this.state.loadingGeoLocation){
            // return <span>loading geo location</span>;
            return <Spin tip="Loading geo location..."/>
        }else if(this.state.loadingPosts){
            return <Spin tip="Loading posts..."/>
        }else if(this.state.posts && this.state.posts.length>0){
            const images = this.state.posts.map((post)=>{
               return {
                   user: post.user,
                   src: post.url,
                   thumbnail: post.url,
                   thumbnailWidth: 400,
                   thumbnailHeight: 300,
                   caption: post.message,
               };
            });
            return <Gallery images={images}/>
        }
    }

    loadNearByPosts =(location, radius)=>{
        const {lat, lon} = location? location: JSON.parse(localStorage.getItem(POS_KEY));
        // const {lat, lon} = {lat:47.7915953, lon:-122.3937977};
        const range = radius ? radius : 20;

        this.setState({loadingPosts:true, error:''});
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${range}`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response) =>{
            this.setState({posts:response, loadingPosts:false, error:''});
            console.log("posts: "+ response);
        }, (error)=>{
            this.setState({loadingPosts:false, error:error.responseText});
        }).catch((error)=>{
            console.log(error);
        });
    }

    render(){
        const createPostButton = <CreatePostButton loadNearByPosts={this.loadNearByPosts}/>;

        return (//jsx ==  React.createElement(..)
            <Tabs tabBarExtraContent={createPostButton} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    <WrappedAroundMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }}/>}
                        posts = {this.state.posts}
                        loadNearByPosts = {this.loadNearByPosts}
                    />
                </TabPane>
            </Tabs>
        );
    }
}
