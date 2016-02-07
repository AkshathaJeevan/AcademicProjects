
(defn left-child\
 [node]\
 (node 1))\
(defn right-child\
 [node]\
 (node 2))\
(defn value \
 [node]\
 (node 0))\
\
(defn make-heap\
   [left value right]\
      \{:left left :val value :right right\})\
\
(defn position-of \
 "Return path to k in tree"\
 [tree k]\
 (let [left (left-child tree)\
 right (right-child tree)\
 value (value tree)]\
 (cond \
 (= k value) nil\
 (and left (< k value)) (cons 1 (position-of left k))\
 (< k value) [1]\
  (and right (> k value)) (cons 2 (position-of right k))\
 (> k value) [2])))\
\
(defn heap-insert\
  [tree value]\
  (assoc-in tree (position-of tree)[value nil nil]))\
(\
 def make-heap [10 nil nil])\
\
********************************************************************************************************\
;;make a min-heap tree\
(defn make-heap\
  [left value right]\
    \{:left left :val value :right right\})\
\
;; to find where to insert next element\
(defn height\
  [tree value m]\
   (let [a(:left tree)\
      b(:right tree)]\
       (cond\
          (= a 0) (make-heap (insert (:left tree) value) m (:right tree)))\
             :else (make-heap (:left tree) m (insert (:right tree) value))))\
\
;;Insert a value in the tree\
(defn insert\
  [tree value]\
    (if-let [member (:val tree)]\
      (cond\
       (= value member) tree\
        (< value member) (make-heap (insert(:left tree) member) value (:right tree))\
         :else (height tree value member))\
           (make-heap nil value nil)))\
\
;;making min heap\
(def min-heap\
  (make-tree nil nil nil)\
  )\
\
(-> min-heap\
(insert 10)\
    (insert 20)\
   (insert 30)\
    (insert 40))\
***********************************************************************************************\
}
