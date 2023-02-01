import React, {Component} from 'react';
import {Label, Select} from "flowbite-react";

class TypeSelect extends React.Component {

    render() {
        return (
            <div id="select">
                <div className="mb-2 block">
                    <Label
                        htmlFor="countries"
                        value="Select your country"
                    />
                </div>
                <Select
                    id="countries"
                    required={true}
                >
                    <option>
                        United States
                    </option>
                    <option>
                        Canada
                    </option>
                    <option>
                        France
                    </option>
                    <option>
                        Germany
                    </option>
                </Select>
            </div>
        );
    }
}

export default class TypeSelect {
}
