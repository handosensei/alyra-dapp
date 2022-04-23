import React from "react";

export default function Dashboard(props) {
    
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Dashboard d'administration du VOTE</h2>
            <h3>{props.account}</h3>
        </main>
    );
}
