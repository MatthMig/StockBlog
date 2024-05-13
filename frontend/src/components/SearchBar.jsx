import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ onAssetSelect, symbolsData }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleItemClick = (asset) => {
        onAssetSelect(asset);
    };

    const lowerCaseSearchInput = searchInput.toLowerCase();
    const filteredData = searchInput
                            ? symbolsData.filter((asset) => asset.name.toLowerCase().includes(lowerCaseSearchInput))
                            : symbolsData;

    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-custom-components">
                {searchInput ? `Filtered (${filteredData.length})` : 'Select a symbol'}
            </Dropdown.Toggle>
            <Dropdown.Menu show={true}>
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={handleChange}
                    value={searchInput}
                />
                <ul className="list-unstyled" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredData.map((asset, index) => (
                    <Dropdown.Item key={index} onClick={() => handleItemClick(asset)}>{asset.name}</Dropdown.Item>
                ))}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SearchBar;
