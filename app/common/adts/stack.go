package adts

type Stack []int

func (s *Stack) Push(v int) {
	if len(*s) < 3 {
		*s = append(*s, v)
	}
}

func (s *Stack) Pop() int {
	if len(*s) > 0 {
		res := (*s)[len(*s)-1]
		*s = (*s)[:len(*s)-1]
		return res
	} else {
		return 0
	}
}
