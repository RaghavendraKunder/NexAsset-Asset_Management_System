package com.NexAsset.NexAsset_backend.entity;

import com.NexAsset.NexAsset_backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_user_email",
            columnNames = "email"
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(
        nullable = false,
        length = 100
    )
    private String name;


    @Column(
        nullable = false,
        unique = true,
        length = 150
    )
    private String email;


    @Column(
        nullable = false,
        length = 255
    )
    private String password;


    @Enumerated(EnumType.STRING)
    @Column(
        nullable = false,
        length = 20
    )
    @Builder.Default
    private UserRole role = UserRole.EMPLOYEE;


    @Column(
        nullable = false
    )
    @Builder.Default
    private Boolean enabled = true;


    @Column(
        nullable = false,
        updatable = false
    )
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();


    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (enabled == null) {
            enabled = true;
        }

        if (role == null) {
            role = UserRole.EMPLOYEE;
        }
    }
}
