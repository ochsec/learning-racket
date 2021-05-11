#lang racket

(define my-test-list '(1 2 3))
(define [gt-1 x] (> x 1))

; filter
(filter gt-1 my-test-list) ; '(2 3)

; implementation of filter
(define [my-filter fun lst]
  (cond ((eq? lst '()) '())
        ((fun (car lst)) (cons (car lst) (my-filter fun (cdr lst))))
        (else (my-filter fun (cdr lst)))))

(my-filter gt-1 my-test-list) ; '(2 3)
