import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApplicationIndexState }  from '../store';
import * as MainState from '../store/Main';

import InputSearch from './InputSearch';
import Carousel from './Carousel';
import Featured from './Featured';

type MainProps =
    MainState.MainState        // ... state we've requested from the Redux store
    & typeof MainState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{pageType: string; uniqueIdentifier: string}>; // ... plus incoming routing parameters

interface MainUIState {}

class Main extends React.Component<MainProps, MainUIState> {
    constructor(props: MainProps) {
        super(props);
    }

    componentWillMount() {
        this.props.requestCarouselApi('home');
        this.props.requestFeaturedApi('home');
    }

    public render() {
        return (
            <div className="demo-container">
                <InputSearch 
                    onChange={this.handleOnSearchChange}
                />
                <div className="demo-container__main">
                    <Carousel 
                        data={this.props.filteredData}
                        isLoading={this.props.isLoadingCarousel}
                    />
                    <Featured
                        data={this.props.featuredData}
                        isLoading={this.props.isLoadingFeatured}
                    />
                </div>
            </div>
        );
    }
    
    private handleOnSearchChange = (searchInput: string) => {
        this.props.requestFilteredData(searchInput, 'home');
    }
}

export default connect(
    (state: ApplicationIndexState) => state.MainPageState,
    // Selects which state properties
    // are merged into the component's props
    MainState.actionCreators
    // Selects which action creators are merged into the component's props
)(Main) as typeof Main;
