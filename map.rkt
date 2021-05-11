#lang racket

(define my-test-list '(1 2 3))
(define [add-one x] (+ x 1))

;map

(map (lambda [x] (+ x 1)) my-test-list) ; '(2 3 4)
(map add-one my-test-list) ; '(2 3 4)

; implementation
(define [my-map fun lst]
  (cond ((eq? lst '()) '())
        (else (cons (fun (car lst)) (my-map fun (cdr lst))))))

(my-map (lambda [x] (+ x 1)) my-test-list) ; '(2 3 4)
