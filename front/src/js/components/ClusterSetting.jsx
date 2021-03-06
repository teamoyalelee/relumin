var React = require('react');
var moment = require('moment');

var ClusterActions = require('../actions/ClusterActions');
var ClusterNoticeStore = require('../stores/ClusterNoticeStore');
var ClusterSettingGeneral = require('../components/ClusterSettingGeneral');
var ClusterSettingThreshold = require('../components/ClusterSettingThreshold');
var ClusterSettingDelete = require('../components/ClusterSettingDelete');
var ClusterSettingChangeName = require('../components/ClusterSettingChangeName');
var Utils = require('../utils/Utils');

var ClusterSetting = React.createClass({
    getInitialState: function() {
        return {
            notice: ClusterNoticeStore.getClusterNotice(this.props.cluster.cluster_name)
        };
    },
    componentDidMount: function() {
        ClusterNoticeStore.addChangeListener(this.handleChangeClusterNotice);

        ClusterActions.getClusterNotice(this.props.cluster.cluster_name);
    },
    componentWillUnmount: function() {
        ClusterNoticeStore.removeChangeListener(this.handleChangeClusterNotice);
    },
    render: function() {
        return (
            <div className="cluster-setting-components">
                <ClusterSettingGeneral cluster={this.props.cluster} notice={this.state.notice} />
                <ClusterSettingThreshold cluster={this.props.cluster} notice={this.state.notice} />
                <ClusterSettingChangeName cluster={this.props.cluster} />
                <ClusterSettingDelete cluster={this.props.cluster} />
            </div>
        );
    },
    handleChangeClusterNotice: function() {
        this.setState({
            notice: ClusterNoticeStore.getClusterNotice(this.props.cluster.cluster_name)
        });
    }
});

module.exports = ClusterSetting;
