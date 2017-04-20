/* jslint node: true, esnext: true */
'use strict';

import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionPregnantWoman from 'material-ui/svg-icons/action/pregnant-woman';
import PlacesChildCare from 'material-ui/svg-icons/places/child-care';
import SocialDomain from 'material-ui/svg-icons/social/domain';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import MapsLocalHospital from 'material-ui/svg-icons/maps/local-hospital';
import SocialMoodBad from 'material-ui/svg-icons/social/mood-bad';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import ImageWebCloudy from 'material-ui/svg-icons/image/wb-cloudy';

export default class Third_Two_Footer extends Component {

render() {
  var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
   };

  const {selectedIndex}=this.props;
  const {onSelect}=this.props;
    return (
      <Paper zDepth={1}>
        <button type="button" onClick={() => onSelect(23)}  style={{ color: 'white',margin: '5px',float:'right', backgroundColor: '#00CCCC', border: 'none', borderRadius: '6', fontSize: '11'}}>General Clothing</button>

        <button type="button" onClick={() => onSelect(24)}  style={{ color: 'white',margin: '5px',float:'right', backgroundColor: '#00CCCC', border: 'none', borderRadius: '6', fontSize: '11' }}>Baby Clothing </button>

        
       
      </Paper>
);
  }
}