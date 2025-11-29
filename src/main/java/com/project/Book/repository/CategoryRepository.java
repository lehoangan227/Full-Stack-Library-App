package com.project.Book.repository;

import com.project.Book.dto.request.SearchBookRequest;
import com.project.Book.entity.Book;
import com.project.Book.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByCateCodeAndIsDeleteFalse(String cateCode);
    Optional<Category> findByCateIdAndIsDeleteFalse(int cateId);
    List<Category> findAllByCateIdInAndIsDeleteFalse(List<Integer> cateIds);
    boolean existsByCateIdAndIsDeleteFalse(int cateId);

    @Modifying
    @Query("""
        UPDATE Category c SET c.isDelete = true WHERE c.cateId = :cateId
    """)
    void softDeleteByCateId(@Param("cateId") int cateId);

    @Query("""
        SELECT c FROM Category c 
        WHERE (:cateName IS NULL OR c.cateName LIKE CONCAT('%',:cateName ,'%'))
          AND c.isDelete = false
    """)
    Page<Category> searchCategories(Pageable pageable, @Param("cateName") String cateName);

    @Query(value = """
        select b from Book b join b.categories c where c.cateId = :cateId
        AND (:#{#request.bookTitle} IS NULL OR b.bookTitle LIKE CONCAT('%', :#{#request.bookTitle}, '%'))
        AND (:#{#request.publisher} IS NULL OR b.publisher LIKE CONCAT('%', :#{#request.publisher}, '%'))
        AND (:#{#request.language} IS NULL OR b.language LIKE CONCAT('%', :#{#request.language}, '%'))
        AND (:#{#request.authors} IS NULL OR b.authors LIKE CONCAT('%', :#{#request.authors}, '%'))
        AND b.isDelete = false
    """)
    Page<Book> searchBooksByCategory(Pageable pageable, @Param("request") SearchBookRequest request, @Param("cateId") int cateId);

    @Query("""
        select c.cateName, count(b) from Category c join c.books b where c.isDelete = false and b.isDelete = false group by c.cateId
    """)
    List<Object[]> statisticBookQuantityByCategory();
}
