import React from "react";
import AddButton from "@/Components/AddButton";

export default function FlexAddButtonDiv({href, resource}) {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <AddButton href={href}>Add {resource}</AddButton>
        </div>
    );
}
