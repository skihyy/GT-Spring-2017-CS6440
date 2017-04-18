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

export default class Footer extends Component {

render() {

  const {selectedIndex}=this.props;
  const {onSelect}=this.props;

    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={selectedIndex}>
          <BottomNavigationItem
            label="View All"
            icon={<ActionHome />}
            onTouchTap={() => onSelect(0)}
          />
          <BottomNavigationItem
            label="General Medical Care"
            icon={<MapsLocalHospital />}
            onTouchTap={() => onSelect(1)}
          />
          <BottomNavigationItem
            label="Women"
            icon={<ActionPregnantWoman />}
            onTouchTap={() => onSelect(2)}
          />
          <BottomNavigationItem
            label="Children"
            icon={<PlacesChildCare />}
            onTouchTap={() => onSelect(3)}
          />
          <BottomNavigationItem
            label="Psychiatric"
            icon={<ImageWebCloudy />}
            onTouchTap={() => onSelect(4)}
          />
          <BottomNavigationItem
            label="Dental"
            icon={<SocialMoodBad />}
            onTouchTap={() => onSelect(5)}
          />
          <BottomNavigationItem
             label="Food"
             icon={<MapsLocalDining />}
             onTouchTap={() => onSelect(6)}
           />
          <BottomNavigationItem
            label="Housing"
            icon={<SocialDomain />}
            onTouchTap={() => onSelect(7)}
          />
          <BottomNavigationItem
            label="Others"
            icon={<NavigationMoreHoriz />}
            onTouchTap={() => onSelect(8)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
