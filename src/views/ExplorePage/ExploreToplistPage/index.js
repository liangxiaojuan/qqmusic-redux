/**
 * Created by jiawei6 on 2016/11/23.
 */
import React, {Component} from 'react';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {toplistActions, getToplist} from '../../../core/toplist';
import TopCard from './TopCard';

import './ExploreToplistPage.css';

const TOP_TYPE = ['top', 'global'];

class ExploreToplistPage extends Component {

	componentWillMount() {
		const {toplistAll, loadToplistAll} = this.props;
		if (!toplistAll) {
			loadToplistAll();
		}
	}

	render() {
		const {toplistAll} = this.props;
		if (toplistAll) {
			return (
				<div className="explore_toplist_page_wrap">
					{
						toplistAll.map((list, i) => {
							return (
								<div key={i}>
									<h1>{list.GroupName}</h1>
									{
										list.List.map((item, i) => (
											<Link to={`/toplist/${item.topID}?date=${item.update_key}&type=${TOP_TYPE[item.type]}`} key={i}>
												<TopCard data={item}/>
											</Link>
										))
									}
								</div>
							)
						})
					}
				</div>
			)
		} else {
			return (
				<div>
					加载中....
				</div>
			)
		}
	}
}

const mapStateToProps = createSelector(
	getToplist,
	(toplist) => ({
		toplistAll: toplist.all
	})
);

const mapDispatchToProps = {
	loadToplistAll: toplistActions.loadToplistAll
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExploreToplistPage);