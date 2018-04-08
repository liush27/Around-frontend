import React from 'react';
import {POS_KEY} from '../constants';
import {AroundMarker} from "./AroundMarker";
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';
//  https://github.com/tomchentw/react-google-maps
class AroundMap extends React.Component {
    reloadMarkers = ()=>{
        const center = this.map.getCenter();
        const location = {lat: center.lat(), lon: center.lng()};
        const range = this.getRange();
        this.props.loadNearByPosts(location, range);
    }

    getMapRef = (map) =>{
        this.map = map;
        window.map = map;//  方便你在console里debug
    }

    getRange = () => {
        const google = window.google;//原生有
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();// 东北角 和 西南角
        if (center && bounds) {
            const ne = bounds.getNorthEast();//中心的维度 东点的经度
            const right = new google.maps.LatLng(center.lat(), ne.lng());
              // 0.000621371192 is meter to mile
            return 0.000621371192 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            //GoogleMap component render之后,会调用 getMapRef,存到this.map中
            <GoogleMap
                ref={this.getMapRef}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon}}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                defaultOptions={{ scaleControl: true }}
            >
                {this.props.posts &&
                    this.props.posts.map((post) =>(
                       <AroundMarker post={post} key={post.url}/>
                    ))
                }
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));