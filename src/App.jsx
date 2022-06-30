import React from "react";
import { Search } from "./components/search.jsx";

export function App () {
    return (
        <Search />
    )
}

// propagation fix
// export class App extends React.Component {
//     render() {
//       return (
//         <Search />
//       );
//     }
//  }