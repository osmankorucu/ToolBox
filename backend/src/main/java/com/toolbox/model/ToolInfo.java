package com.toolbox.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToolInfo {
    private String id;
    private String name;
    private String icon;
    private String category;
    private String description;
    private String route;
}
