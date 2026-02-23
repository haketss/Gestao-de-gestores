import { memo } from "react";

export const Header = memo(function Header(props) {
    return (
        <header>
            <h1 className="text-center p-3">{props.title}</h1>
        </header>
    )
});
