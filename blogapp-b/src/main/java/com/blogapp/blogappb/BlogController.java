package com.blogapp.blogappb;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {
    private final BlogRepository repo;
    public BlogController(BlogRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Blog> getAll() { return repo.findAll(); }

    @PostMapping
    public Blog addBlog(@RequestBody Blog blog) { return repo.save(blog); }

    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        Blog b = repo.findById(id).orElseThrow();
        b.setTitle(blog.getTitle());
        b.setContent(blog.getContent());
        return repo.save(b);
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable Long id) { repo.deleteById(id); }
}
