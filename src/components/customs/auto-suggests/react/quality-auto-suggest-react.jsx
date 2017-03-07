import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const resource = 'master/qualities';

const empty = {
    code: ''
}

'use strict';

export default class QualityAutoSuggestReact extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, QualityAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.code}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

QualityAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

QualityAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("core");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(quality => {
                        quality.toString = function () {
                            return `${this.code}`;
                        }
                        return quality;
                    });
                });
        }
    }
};
