'use strict';

import React, {
    Component
} from 'react';
import Formsy from 'formsy-react';

import StarRatingComponent from 'react-star-rating-component';
import GoogleMap from 'google-map-react';

import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    CardTitle,
    CardMedia
} from 'material-ui/Card';
import { cyan300, indigo900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

//Formsy-React is a library used for input validation in this web app
//See more at https://github.com/christianalfoni/formsy-react
import {
    FormsyCheckbox,
    FormsyDate,
    FormsyRadio,
    FormsyRadioGroup,
    FormsySelect,
    FormsyText,
    FormsyTime,
    FormsyToggle,
    FormsyAutoComplete
} from 'formsy-material-ui/lib';

//* ***************************************** *//
//* all styles defined here
//* ***************************************** *//

const styles = {
    card: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        margin: 2,
        padding: 1
    },

    chip: {
        margin: 2,
        height: '50%',
        fontSize: 8,
        backgroundColor: cyan300,
        fontColor: '#FFFFFF'
    },

    chipInfo: {
        padding: 6,
        height: '80%'
    },

    data: {
        margin: '2px',
    },

    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    },

    main: {

        width: '100%',
        alignment: 'right',
        display: 'inline-block',
    },

    reviews: {
        margin: 10
    },

    stars: {
        marginTop: 5
    },

    smallIcon: {
        width: 20,
        height: 20,
        padding: 1
    },

    smallButton: {
        height: 20,
        padding: 1,
        margin: 1,
        fontSize: 12
    },

    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

};


export default class ClinicPage extends React.Component {

    //constructor
    constructor(props) {
        super(props);

        this.state = {

        //Flags for all expandable containers in the page
            submitfeedbackOpen: false,
            flagcontentOpen: false,
            feedbackExpanded: false,
            descriptionExpanded: false,
            tagsExpanded: false,
            vouchSnackbarOpen: false,
            submitSnackbarOpen: false,

        //Defaults for any input values to be stored in state
            value_Author: "Anonymous",
            accessibilityRating: 0,
            qualityRating: 0,
            affordabilityRating: 0,
            value_Descript: "",
            previous_Tags: [],
            chipData: [],
            value_NewTag: '',
        };

        this.errorMessages = {
            customError: "Incorrect format",
            wordsError: "Please only use letters",
            numericError: "Please provide a number",
            urlError: "Please provide a valid URL",
        };

    }

    componentDidMount() {
        this.searchSizer();
        window.addEventListener('resize', () => this.searchSizer(), false);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.searchSizer, false);
    }

    //* ***************************************** *//
    //Begin actions
    //* ***************************************** *//

      formatDescription(description) {

            if(description.length<1000){
              return (<div>{description}</div>)
            }else if (this.state.descriptionExpanded) {
                return (<div>
                          {description}
                          <FlatButton onClick={()=>this.setState({descriptionExpanded:!this.state.descriptionExpanded})} label={"<< less"}/>
                        </div>)
            } else {
                var des_a = description.slice(0, 1000);
                return (<div>
                          {des_a}
                          <FlatButton onClick={()=>this.setState({descriptionExpanded:!this.state.descriptionExpanded})} label={">> more"}/>
                        </div>)
            }
        }

    formatFeedbacks(reviews) {

        if (reviews.length === 0) {
            return "No feedback yet. Would you like to add one?";
        } else{

            return reviews.map((feedback, i) =>
                <Card><b>{"Author: "+feedback.author}</b>
            <div>Accessibility: {feedback.accessibility+"/5"} </div>
            <div>Quality: {feedback.quality+"/5"} </div>
            <div>Affordability: {feedback.affordability+"/5"}</div>
            <div><b>Comments:</b>{feedback.text}</div></Card>);
            <br />
        }

    }

    formatServices(services) {

        if (services.length > 0) {
            return services.map((service, i) =>
                <li key={i}><b>{service.label}</b></li>
            );
        } else return <p>None specified</p>;
    }

    formatSubmission(name) {

        var temp = {
            name: name,
            author: this.state.value_Author,
            accessibility: this.state.accessibilityRating,
            quality: this.state.qualityRating,
            affordability: this.state.affordabilityRating,
            text: this.state.value_Descript
        }

        return temp;

    }

    formatTags(previousTags, vouchFor, vouchAgainst, tagdoc){

    if(!previousTags){

      return "loading";

    } else if(previousTags.length<8){
      return (previousTags.map((tag, i) =>
          <li style={styles.list} key={i}><div style={styles.wrapper}>
          <Chip style={styles.chip}>
          <b>{tag.value+"  "}</b>
          </Chip>
          <div style={styles.chipInfo}>{"("+tag.count+" users vouched for this)"}</div>
          <IconButton
          style={styles.smallIcon}
          tooltip="vouch for"
          onTouchTap={()=>{vouchFor(tagdoc, i)
                          this.setState({vouchSnackbarOpen:true})}}><NavigationArrowUpward /></IconButton>
          <IconButton
          style={styles.smallIcon}
          tooltip="vouch against"
          onTouchTap={()=>{vouchAgainst(tagdoc, i)
                          this.setState({vouchSnackbarOpen:true})}}><NavigationArrowDownward /></IconButton>
          </div>
                  </li>))

      }
      else if(this.state.tagsExpanded){
        return (previousTags.map((tag, i) =>
                      <li style={styles.list} key={i}><div style={styles.wrapper}>
                      <Chip style={styles.chip}>
                      <b>{tag.value+"  "}</b>
                      </Chip>
                      <div style={styles.chipInfo}>{"("+tag.count+" users vouched for this)"}</div>
                      <IconButton
                      style={styles.smallIcon}
                      tooltip="vouch for"
                      onTouchTap={()=>{vouchFor(tagdoc, i)
                                      this.setState({vouchSnackbarOpen:true})}}><NavigationArrowUpward /></IconButton>
                      <IconButton
                      style={styles.smallIcon}
                      tooltip="vouch against"
                      onTouchTap={()=>{vouchAgainst(tagdoc, i)
                                      this.setState({vouchSnackbarOpen:true})}}><NavigationArrowDownward /></IconButton>
                      </div>
                              </li>))

      }
      else {
        var tags_a = previousTags.slice(0, 8);
        return (tags_a.map((tag, i) =>
                      <li style={styles.list} key={i}><div style={styles.wrapper}>
                      <Chip style={styles.chip}>
                      <b>{tag.value+"  "}</b>
                      </Chip>
                      <div style={styles.chipInfo}>{"("+tag.count+" users vouched for this)"}</div>
                      <IconButton
                      style={styles.smallIcon}
                      tooltip="vouch for"
                      onTouchTap={()=>{vouchFor(tagdoc, i)
                                      this.setState({vouchSnackbarOpen:true})}}><NavigationArrowUpward /></IconButton>
                      <IconButton
                      style={styles.smallIcon}
                      tooltip="vouch against"
                      onTouchTap={()=>{vouchAgainst(tagdoc, i)
                                      this.setState({vouchSnackbarOpen:true})}}><NavigationArrowDownward /></IconButton>
                      </div>
                              </li>))

        }

    }

    getRating(result, id) {

        if (results.reviews.length() === 0) {
            return 0;
        }
        if (id === '0') {
            return result.ratings.overall;
        }
        if (id === '1') {
            return result.ratings.quality;
        }
        if (id === '2') {
            return result.ratings.accessibility;
        }
        if (id === '3') {
            return result.ratings.affordability;
        }
        return 0;

    }

    renderChip(data) {
        return (
            <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={styles.chip}
      >
        {data.label}
      </Chip>
        );
    }

    searchSizer() {
        const {
            container,
            footer
        } = this.props;
        const {
            offsetHeight,
            offsetWidth
        } = container;
        const footerOffsetHeight = footer.offsetHeight;
        this.setState({
            offsetHeight,
            offsetWidth,
            footerOffsetHeight
        });
    }

    viewAllFeedbacks(revs) {

        if (this.state.feedbackExpanded) {

            if (revs.length >= 3) {

                var revs_a = revs.slice(3, revs.length);
                return revs_a.map((feedback, i) =>
                    <li key={feedback._id}><b>{"Author: "+feedback.author}</b>
                <div>Accessibility: {feedback.accessibility+"/5"} </div>
                <div>Quality: {feedback.quality+"/5"} </div>
                <div>Affordability: {feedback.affordability+"/5"}</div>
                <div><b>Comments:</b>{feedback.text}</div></li>);
                <br />
            } else {

                return "No more feedback to show";

            }
        } else return "";

    }

    render() {

        const { addTags, getTags, getFeedbacks, vouchFor, vouchAgainst, addSingleTag, addFlag } = this.props;
        const { customError, wordsError, numericError, urlError } = this.errorMessages;
        const tagdoc = getTags();
        var previousTags=tagdoc.tags;
        const allFeedbacks = getFeedbacks();
        const { offsetWidth, offsetHeight, footerOffsetHeight } = this.state;
        if (offsetHeight === undefined) {
            return null;
        }
        const { result } = this.props;
        const id = result._id;
        const { addFeedback } = this.props;
        var expandedFeedback = this.viewAllFeedbacks(allFeedbacks);


        return (

            <div style={{height: (offsetHeight), overflow: 'auto'}}>
      <Paper style={styles.main} zDepth={1}>

{/* ***************************************** */}
{/* Section 1 */}
{/* ***************************************** */}

        <Card style ={styles.card}>
        <CardHeader title={result.name} subtitle={result.civic_address} avatar="http://icons.iconarchive.com/icons/icons8/android/512/Healthcare-Clinic-icon.png"/>
          <CardText>

              <div style={styles.data}>
                <h4> Address: </h4>
                {result.civic_address}
                <FlatButton href = {"http://maps.google.com/?saddr=Current+Location&daddr=" + result.civic_address} primary = {true} target = "_blank" label={"Click to View Direction"}/>
                <h4> Phone: </h4>
                {result.phone}
                <h4> Website: </h4>
                {result.website}
                <h4> Description: </h4>
                {this.formatDescription(result.description)}

            </div>
        </CardText>
      </Card>


{/* ***************************************** */}
{/* Section 2: List of tags */}
{/* ***************************************** */}
      <Card style ={styles.card}>
      <CardHeader title="Tags"/>
        <CardText>
          <ul style={styles.list}>
        {this.formatTags(previousTags, vouchFor, vouchAgainst, tagdoc)}
        <FlatButton onClick={()=>this.setState({descriptionExpanded:!this.state.tagsExpanded})} label={">> view all"}/>
          </ul>
          <div style={styles.row}>
             <TextField hintText=""
                        hintStyle={styles.hint}
                        floatingLabelStyle={styles.floatinglabel}
                        inputStyle={styles.input}
                        floatingLabelText="Add New Tags"
                        floatingLabelFixed={true}
                        value={this.state.value_Tags}
                        onChange={(event) => this.setState({value_NewTag: event.target.value})}/><br />
              <RaisedButton onTouchTap={() => addSingleTag(this.state.value_NewTag, tagdoc)}> Submit</RaisedButton>
             <br />
            </div>
        </CardText>
      </Card>

      <Snackbar
          open={this.state.vouchSnackbarOpen}
          message="Your vote has been recorded"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />

{/* ***************************************** */}
{/* Section 3: services*/}
{/* ***************************************** */}
      <Card style ={styles.card}>
        <CardHeader title="Services"/>
          <CardText>
            {this.formatServices(result.services)}
          </CardText>
        </Card>

{/* ***************************************** */}
{/* Section 4: Feedback */}
{/* ***************************************** */}
<div id="feedback">
      <Card style ={styles.card}>
          <CardHeader
          title="Feedback"/>
          <CardText>
            <div>

                                  <RaisedButton
                                    style={styles.smallButton}
                                    label="Submit Feedback"
                                    primary={true}
                                    onTouchTap={() => this.setState({submitfeedbackOpen: true})}/>

                                  <RaisedButton
                                    label="Flag this Content"
                                    style={styles.smallButton}
                                    primary={true}
                                    onTouchTap={() =>this.setState({flagcontentOpen: true})}/>
            </div>
            <br />
                    <div style={styles.reviews}>
                    {this.formatFeedbacks(allFeedbacks)}
                    </div>

        </CardText>
      </Card>
</div>
{/* ***************************************** */}
{/* Section 5: Submit Feedback */}
{/* ***************************************** */}
{/* ***************************************** */}
{/* ***************************************** */}
<Dialog
    title="Submit Feedback"
    autoScrollBodyContent={true}
    actions={[
       <FlatButton
         label="Cancel"
         primary={true}
         onTouchTap={() => this.setState({submitfeedbackOpen: false})}/>,
       <FlatButton
         label="Submit"
         primary={true}
         onTouchTap={() =>{
                            var x=this.formatSubmission(result.name);
                            addFeedback(x);
                            this.setState({submitfeedbackOpen: false})
                            this.setState({submitSnackbarOpen:true})
                            }}/>]}

        modal={false}
        open={this.state.submitfeedbackOpen}
        onRequestClose={() => this.setState({submitfeedbackOpen: false})}>

      <Formsy.Form
            onValid={()=>this.setState({ canSubmit: true })}
            onInvalid={()=>this.setState({ canSubmit: false })}
            onInvalidSubmit={()=>this.notifyFormError}
          >

      <CardText>
        <div> Fields marked by an asterisk * are required </div>
        <div className="feedback-container">
        <br />
        <b>Name (optional):   </b>
        <FormsyText name="name"
                  validations="isWords"
                  validationError={wordsError}
                  hintText="Your name"
                  hintStyle={styles.hint}
                  inputStyle={styles.input}
                  floatingLabelStyle={styles.floatinglabel}
                  onChange={(event) => this.setState({value_Author: event.target.value})}/><br />
            <div>
              <p><b>Wait Time: </b>Approximate waiting time? Select below:</p>
              <SelectField
                floatingLabelText="Waiting Time"
                value={this.state.value_Wait}
                onChange={(event, index, value) => this.setState({value_Wait:value})}
              >
                <MenuItem value={1} primaryText="Immediate/Walk-In" />
                <MenuItem value={2} primaryText="2 hours" />
                <MenuItem value={3} primaryText="3 hours" />
                <MenuItem value={4} primaryText="4 hours" />
                <MenuItem value={5} primaryText="5 hours" />
                <MenuItem value={6} primaryText="6 hours" />
                <MenuItem value={7} primaryText="8 hours" />
                <MenuItem value={8} primaryText="Next day" />
                <MenuItem value={9} primaryText="2-3 days" />
                <MenuItem value={10} primaryText="1 week" />
                <MenuItem value={11} primaryText="1 month" />
                <MenuItem value={12} primaryText="3 months" />
                <MenuItem value={13} primaryText="6 months" />
                <MenuItem value={14} primaryText="1 year" />
              </SelectField>
            </div>
            <div>
              <p><b>Accessibility: </b>How easy was it to book an appointment/access services?</p>
              <StarRatingComponent
                name="accessibility" /* name of the radio input, it is required */
                value={this.state.accessibilityRating} /* number of selected icon (`0` - none, `1` - first) */
                starCount={5} /* number of icons in rating, default `5` */
                onStarClick={(nextValue, prevValue, name)=>this.setState({accessibilityRating: nextValue})}
              />
            </div>
            <div>
              <p><b>Affordibility: </b> Was it affordable?</p>
              <StarRatingComponent
                name="affordability" /* name of the radio input, it is required */
                value={this.state.affordabilityRating} /* number of selected icon (`0` - none, `1` - first) */
                starCount={5} /* number of icons in rating, default `5` */
                onStarClick={(nextValue, prevValue, name)=>this.setState({affordabilityRating: nextValue})}
              />
            </div>
            <div>
              <p><b>Communication: </b>How was the communication and professionalism of the staff?</p>
              <StarRatingComponent
                name="Communication" /* name of the radio input, it is required */
                value={this.state.qualityRating} /* number of selected icon (`0` - none, `1` - first) */
                starCount={5} /* number of icons in rating, default `5` */
                onStarClick={(nextValue, prevValue, name)=>this.setState({qualityRating: nextValue})}
              />
            </div>
            <div>
              <p> Enter any details that might help others who are looking for healthcare. (Limit 160 char)</p>

              <TextField hintText="Limit 160 char"
                         inputStyle={styles.input}
                         floatingLabelStyle={styles.floatinglabel}
                         floatingLabelText="Comments "
                         floatingLabelFixed={true}
                         multiLine={true}
                         rows={3}
                         rowsMax={8}
                         onChange={(event) => this.setState({value_Descript: event.target.value})}/><br />

                  <br />
           </div>

          </div>
      </CardText>
      </Formsy.Form>
    </Dialog>

      <Snackbar
          open={this.state.submitSnackbarOpen}
          message="Thank you for your feedback!"
          autoHideDuration={4000}
        />

{/* ***************************************** */}
{/* Section 6: Flag Content */}
{/* ***************************************** */}
<Dialog
    title="Flag Content"
    autoScrollBodyContent={true}
    actions={[
       <FlatButton
         label="OK"
         primary={true}
         onTouchTap={() => this.setState({flagcontentOpen: false})}/>]}
        modal={false}
        open={this.state.flagcontentOpen}
        onRequestClose={() => this.setState({flagcontentOpen: false})}>
            <CardText>
              <div>

            <h3> This feature will be available soon </h3>

              </div>
            </CardText>
    </Dialog>

    </Paper>
  </div>

        );
    }
}

//* ***************************************** *//
//Typechecking
//* ***************************************** *//

ClinicPage.PropTypes = {
    label: React.PropTypes.string,
}


//Class Place for placing component onto map

class Place extends React.Component {
    render() {
        const K_WIDTH = 15;
        const K_HEIGHT = 15;

        const styleHover = {
            // initially any map object has left top corner at lat lng coordinates
            // it's on you to set object origin to 0,0 coordinates
            position: 'absolute',
            width: K_WIDTH,
            height: K_HEIGHT,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT / 2,

            border: '5px solid #4DD0E1',
            borderRadius: K_HEIGHT,
            backgroundColor: '#B2EBF2',
            textAlign: 'center',
            color: '#F06292',
            fontSize: 16,
            fontWeight: 'bold',
            padding: 4
        };

        const style = {
            // initially any map object has left top corner at lat lng coordinates
            // it's on you to set object origin to 0,0 coordinates
            position: 'absolute',
            width: K_WIDTH,
            height: K_HEIGHT,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT / 2,

            border: '3px solid #F06292',
            borderRadius: K_HEIGHT,
            backgroundColor: 'white',
            textAlign: 'center',
            color: '#3f51b5',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 4
        };
        return (
            <div style={this.props.$hover ? styleHover : style}>
       {this.props.text}
    </div>
        );
    }
};
