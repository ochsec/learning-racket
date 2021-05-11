#lang racket

; foldl, foldr
(foldl cons '() '(1 2 3)) ; '(3 2 1)
(foldr cons '() '(1 2 3)) ; '(1 2 3)

; implementation of foldr
(define [my-foldr op i l]
  (cond ((eq? '() l) i)
        (else (op (car l)
                  (my-foldr op i (cdr l))))))

(my-foldr cons '() '(1 2 3 4)) ; '(1 2 3 4)

; implementation of foldl
(define [my-foldl op i l]
  (cond ((eq? '() l) i)
        (else (my-foldl op (op (car l) i) (cdr l)))))

(my-foldl cons '() '(1 2 3 4)) ; '(4 3 2 1)
