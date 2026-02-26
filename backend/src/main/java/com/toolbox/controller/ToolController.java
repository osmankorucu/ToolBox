package com.toolbox.controller;

import com.toolbox.model.ToolInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolController {

    @GetMapping
    public ResponseEntity<List<ToolInfo>> getAllTools() {
        List<ToolInfo> tools = Arrays.asList(
            new ToolInfo(
                "json-formatter",
                "JSON Formatter",
                "code",
                "Developer Tools",
                "Format and validate JSON data",
                "/tools/json-formatter"
            ),
            new ToolInfo(
                "base64-encoder",
                "Base64 Encoder",
                "lock",
                "Developer Tools",
                "Encode and decode Base64 strings",
                "/tools/base64-encoder"
            ),
            new ToolInfo(
                "uuid-generator",
                "UUID Generator",
                "hash",
                "Developer Tools",
                "Generate random UUIDs",
                "/tools/uuid-generator"
            ),
            new ToolInfo(
                "color-picker",
                "Color Picker",
                "palette",
                "Designer Tools",
                "Pick and convert colors",
                "/tools/color-picker"
            ),
            new ToolInfo(
                "unit-converter",
                "Unit Converter",
                "scale",
                "General Tools",
                "Convert between units",
                "/tools/unit-converter"
            ),
            new ToolInfo(
                "password-generator",
                "Password Generator",
                "key",
                "Security Tools",
                "Generate secure passwords",
                "/tools/password-generator"
            )
        );
        
        return ResponseEntity.ok(tools);
    }
}
