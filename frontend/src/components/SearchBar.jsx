import React, { useState } from 'react';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const data = [
        { name: "Euro", value: "€" },
        { name: "Dollar", value: "$" },
        { name: "Pound", value: "£" },
        { name: "Yen", value: "¥" },
    ];

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    let filteredData = data;
    if (searchInput.length > 0) {
        filteredData = data.filter((asset) => asset.name.includes(searchInput));
    }

    return (
        <div className="fixed-top">
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
            <table>
                <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((asset, index) => (
                        <tr key={index}>
                            <td>{asset.name}</td>
                            <td>{asset.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchBar;
