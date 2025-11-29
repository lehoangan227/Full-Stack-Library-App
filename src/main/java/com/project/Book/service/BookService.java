package com.project.Book.service;

import com.project.Book.dto.request.BookRequest;
import com.project.Book.dto.request.BookUpdateRequest;
import com.project.Book.dto.request.SearchBookRequest;
import com.project.Book.dto.response.BookInListResponse;
import com.project.Book.dto.response.BookResponse;
import com.project.Book.dto.response.PageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface BookService {
    BookResponse createBook(BookRequest bookRequest, MultipartFile bookImg);
    BookResponse updateBook(int bookId, BookUpdateRequest bookUpdateRequest, MultipartFile bookImg);
    void deleteBook(int bookId);
    BookResponse getBook(int bookId);
    PageResponse<BookInListResponse> getBooks(int pageNo, int pageSize, SearchBookRequest searchBookRequest, List<String> sorts);
    Integer getTotalBooks();
}
