package com.toolbox.controller;

import com.toolbox.service.ToolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tool")
public class ToolOperationController {

    private final ToolService toolService;

    public ToolOperationController(ToolService toolService) {
        this.toolService = toolService;
    }

    @PostMapping("/json/format")
    public ResponseEntity<Map<String, String>> formatJson(@RequestBody Map<String, String> request) {
        try {
            String formatted = toolService.formatJson(request.get("json"));
            return ResponseEntity.ok(Map.of("result", formatted));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/json/minify")
    public ResponseEntity<Map<String, String>> minifyJson(@RequestBody Map<String, String> request) {
        try {
            String minified = toolService.minifyJson(request.get("json"));
            return ResponseEntity.ok(Map.of("result", minified));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/base64/encode")
    public ResponseEntity<Map<String, String>> encodeBase64(@RequestBody Map<String, String> request) {
        try {
            String encoded = toolService.encodeBase64(request.get("text"));
            return ResponseEntity.ok(Map.of("result", encoded));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/base64/decode")
    public ResponseEntity<Map<String, String>> decodeBase64(@RequestBody Map<String, String> request) {
        try {
            String decoded = toolService.decodeBase64(request.get("text"));
            return ResponseEntity.ok(Map.of("result", decoded));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/uuid/generate")
    public ResponseEntity<Map<String, String>> generateUuid(@RequestParam(defaultValue = "1") int count) {
        if (count == 1) {
            return ResponseEntity.ok(Map.of("result", toolService.generateUuid()));
        }
        return ResponseEntity.ok(Map.of("result", toolService.generateMultipleUuids(count)));
    }

    @GetMapping("/password/generate")
    public ResponseEntity<Map<String, String>> generatePassword(
            @RequestParam(defaultValue = "16") int length,
            @RequestParam(defaultValue = "true") boolean uppercase,
            @RequestParam(defaultValue = "true") boolean lowercase,
            @RequestParam(defaultValue = "true") boolean numbers,
            @RequestParam(defaultValue = "false") boolean special) {
        
        String password = toolService.generatePassword(length, uppercase, lowercase, numbers, special);
        return ResponseEntity.ok(Map.of("result", password));
    }
}
