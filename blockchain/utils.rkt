#lang racket

(require racket/serialize)

; generic true for all
(define (true-for-all? pred lst)
  (cond
    [(empty? lst) #t]
    [(pred (car lst)) (true-for-all? pred (cdr lst))]
    [else #f]))

; export a struct to a file
(define [struct->file object file]
  (let ([out (open-output-file file #:exists 'replace)])
    (write (serialize object) out)
    (close-output-port out)))

; import a struct from a file
(define (file->struct file)
  (letrec ([in (open-input-file file)]
           [result (read in)])
    (close-input-port in)
    (deserialize result)))

(provide true-for-all? struct->file file->struct)
