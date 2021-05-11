#lang racket

; Higher-order funtions

; function that returns a function
(define [f x] (lambda [y] (+ x y)))
(f 1) ; #<procedure:...order-functions.rkt:6:14>
((f 1) 2) ; 3

; implementation of cons
(define [my-cons x y] (lambda [z] (if (= z 1) x y)))
; implementation of car
(define [my-car z] z 1)
; implementation of cdr
(define [my-cdr z] z 2)

(my-car (my-cons 1 2)) ; 1
(my-cdr (my-cons 1 2)) ; 2

; funtion that returns a function that returns a constant
(define const-one (lambda [] 1))

(const-one) ; 1
