import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApplicationIndexState }  from '../store';
// import { PAGE_TYPES } from '../config';
import * as MainState from '../store/Main';

import InputSearch from './InputSearch';
import Carousel from './Carousel';
import Featured from './Featured';

// import Trainers from './Trainers';
// import GearChanges from './GearChanges';

// At runtime, Redux will merge together...
type MainProps =
    MainState.MainState        // ... state we've requested from the Redux store
    & typeof MainState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{pageType: string; uniqueIdentifier: string}>; // ... plus incoming routing parameters

interface MainUIState {}

class Main extends React.Component<MainProps, MainUIState> {
    constructor(props: MainProps) {
        super(props);

        // const path = this.props.match.path;
        // const pageType = PAGE_TYPES[path] || 'jockeyData';
        // const uniqueIdentifier = this.props.match.params.uniqueIdentifier || '';
        // 
    }

    // componentDidMount() {
    //     const pages = Object.keys(PAGE_TYPES).map(key => PAGE_TYPES[key]);
    // 
    //     const preloadApiList = pages.reduce(
    //         (accumulator: string[], page: string) => {
    //             if (page !== this.state.pageType) {
    //                 accumulator.push(page);
    //             }
    // 
    //             return accumulator;
    //         },
    //         []
    //     );
    // 
    //     this.props.requestPreloadApiData(this.state.pageType, preloadApiList, this.state.uniqueIdentifier);
    // }
    // 
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

    // private getData(pageType: string): any {
    //     const data = find(this.props.receivedData, {name: pageType}) ||
    //         find(this.props.preloadedData, {name: pageType});
    // 
    //     return get(data, 'data');
    // }
    // 
    // private postSizeToParent(height: number): void {
    //     if (parent) {
    //         const pageSize = {
    //             height: height
    //         };
    // 
    //         parent.postMessage(pageSize, '*');
    //     }
    // }
    // 
    // private renderLoading(): JSX.Element {
    //     return (
    //         <div className="rn-index-pages__loading">
    //             <div className="rn-loading-bg" />
    //         </div>
    //     );
    // }
}

export default connect(
    (state: ApplicationIndexState) => state.MainPageState,
    // Selects which state properties
    // are merged into the component's props
    MainState.actionCreators
    // Selects which action creators are merged into the component's props
)(Main) as typeof Main;
