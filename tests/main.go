package main
import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

func main() {
	numRequests := 1000
	concurrency := 100
	url := "https://dbbp.ru/projects"
	url2 := "https://dbbp.ru/techSupport"
	var wg sync.WaitGroup
    start := time.Now()

    for i := 0; i < concurrency; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := 0; j < numRequests/concurrency; j++ {
                resp, err := http.Get(url)
				resp1, err1 := http.Get(url2)
                if err != nil {
                    fmt.Printf("Error: %v\n", err)
                    continue
                }
				if err1 != nil {
                    fmt.Printf("Error: %v\n", err)
                    continue
                }
                resp.Body.Close()
				resp1.Body.Close()
            }
        }()
    }

    wg.Wait()
    elapsed := time.Since(start)
    fmt.Printf("Completed %d requests in %s\n", numRequests, elapsed)
}