# Assumptions: amounts and coin denominations are integers; denominations must be
# positive. Duplicate denominations represent the same coin, so are deduplicated.
# Complexity uses expected O(1) dictionary operations and unit-cost arithmetic.

# Time O(c), space O(c): validate and deduplicate denominations without mutation.
def normalize_coins(coins):
    unique = {}
    for coin in coins:
        if not isinstance(coin, int) or isinstance(coin, bool) or coin <= 0:
            raise ValueError('Coin denominations must be positive integers')
        unique[coin] = True
    return tuple(unique)

# Wrapper hit: O(k) to hash k arguments; miss: wrapped work plus O(k).
# Space O(M*k) for M entries, excluding the sizes of cached results.
# With fixed-size arguments and max_size=3, cache space is O(1).
def memoize(max_size=None, lru=False):
    if max_size is not None and (not isinstance(max_size, int) or max_size < 0):
        raise ValueError('max_size must be a nonnegative integer or None')
    def decorate(func):
        cache = {}
        def wrapper(*args):
            wrapper.calls += 1
            if args in cache:
                wrapper.hits += 1
                value = cache[args]
                if lru:
                    del cache[args]
                    cache[args] = value
                return value
            wrapper.misses += 1
            value = func(*args)
            if max_size != 0:
                if max_size is not None and len(cache) >= max_size:
                    del cache[next(iter(cache))]
                cache[args] = value
            wrapper.size = len(cache)
            return value
        wrapper.hits = wrapper.misses = wrapper.calls = wrapper.size = 0
        return wrapper
    return decorate

# Time O(2^(A/d+c)) upper bound, space O(A/d+c): binary recursion, d=min coin.
# For an empty coin list the work is constant, aside from input normalization.
def count_ways(amount, coins):
    coins = normalize_coins(coins)
    def ways(remaining, index):
        if remaining == 0:
            return 1
        if remaining < 0 or index == len(coins):
            return 0
        return ways(remaining - coins[index], index) + ways(remaining, index + 1)
    return ways(amount, 0)

# Time O(2^(A/d+c)) upper bound, space O(A/d+c): same uncached recursion, with
# one constant-time counter increment per recursive call.
def count_ways_with_calls(amount, coins):
    coins = normalize_coins(coins)
    calls = 0
    def ways(remaining, index):
        nonlocal calls
        calls += 1
        if remaining == 0:
            return 1
        if remaining < 0 or index == len(coins):
            return 0
        return ways(remaining - coins[index], index) + ways(remaining, index + 1)
    return ways(amount, 0), calls

# Time O(A*c+c), space O(A*c+A/d+c): each (remaining,index) computed once.
# Capture the immutable coin tuple; cache keys contain only two integers.
# A list cannot be a dictionary key because it is mutable and unhashable.
def count_ways_memo(amount, coins, max_size=None):
    coins = normalize_coins(coins)
    @memoize(max_size)
    def ways(remaining, index):
        if remaining == 0:
            return 1
        if remaining < 0 or index == len(coins):
            return 0
        return ways(remaining - coins[index], index) + ways(remaining, index + 1)
    result = ways(amount, 0)
    return result, ways.hits, ways.misses, ways.calls

# Time O(n), space O(n): each distinct integer belongs to one counted run.
def longest_consecutive(nums):
    table = {}
    for value in nums:
        table[value] = True
    best = 0
    for value in table:
        if value - 1 not in table:
            end = value
            while end in table:
                end += 1
            best = max(best, end - value)
    return best

# Time O(n), space O(n): one pass, counting only previously seen positions.
def count_pairs(nums, target):
    frequencies = {}
    pairs = 0
    for value in nums:
        pairs += frequencies.get(target - value, 0)
        frequencies[value] = frequencies.get(value, 0) + 1
    return pairs

# Time O(2^n) upper bound, space O(n): binary call tree with depth n.
def fib_naive(n):
    if n < 0:
        raise ValueError('n must be nonnegative')
    calls = 0
    def fib(k):
        nonlocal calls
        calls += 1
        if k < 2:
            return k
        return fib(k - 1) + fib(k - 2)
    result = fib(n)
    return result, calls

# Factory O(1) time/space; returned fib O(n) time/space with a fresh cache.
def make_fib():
    @memoize()
    def fib(n):
        if n < 0:
            raise ValueError('n must be nonnegative')
        if n < 2:
            return n
        return fib(n - 1) + fib(n - 2)
    return fib

# Time O(A*c+c), space O(A+c): one amount array plus normalized coins.
def count_ways_bottom_up(amount, coins):
    coins = normalize_coins(coins)
    if amount < 0:
        return 0
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:
        for total in range(coin, amount + 1):
            dp[total] += dp[total - coin]
    return dp[amount]

# Time/space O(1): small function used for eviction demonstrations.
def square(value):
    return value * value

# Driver cost is dominated by naive fib(25); formatting uses constant-size rows.
def main():
    for n in (10, 20, 25):
        naive, calls = fib_naive(n)
        fib = make_fib()
        fast = fib(n)
        assert naive == fast
        print('fib', n, 'naive calls', calls, 'memo calls', fib.calls)
    for n in (35, 90):
        fib = make_fib()
        print('fib', n, '=', fib(n), 'misses', fib.misses)
    naive_result, naive_calls = count_ways_with_calls(100, [1, 5, 10, 25, 50])
    assert naive_result == count_ways(100, [1, 5, 10, 25, 50])
    print('Naive coin result:', naive_result, 'calls', naive_calls)
    answer, hits, misses, calls = count_ways_memo(100, [1, 5, 10, 25, 50])
    print('Memo coin result:', answer, 'hits', hits, 'misses', misses, 'calls', calls)
    bounded = memoize(max_size=3)(square)
    for value in (1, 2, 3, 4, 5, 1):
        old = bounded.misses
        result = bounded(value)
        print('FIFO:', value, result, 'size', bounded.size, 'new miss', bounded.misses - old)
        assert bounded.size <= 3
    for lru in (False, True):
        cached = memoize(max_size=3, lru=lru)(square)
        for value in (1, 2, 3, 1, 4, 1):
            cached(value)
        print('LRU' if lru else 'FIFO', 'hits', cached.hits, 'misses', cached.misses)
    print('Bottom-up amount 10000:', count_ways_bottom_up(10000, [1, 5, 10, 25, 50]))
    rows = [
        ('normalize_coins', 'O(c)', 'O(c)'),
        ('memoize / decorate', 'O(1) setup', 'O(1) setup'),
        ('wrapper', 'hit O(k); miss O(k)+f', 'O(M*k)+values'),
        ('count_ways / ways', 'O(2^(A/d+c)) bound', 'O(A/d+c)'),
        ('count_ways_with_calls / ways', 'O(2^(A/d+c)) bound', 'O(A/d+c)'),
        ('count_ways_memo / ways', 'O(A*c+c), unlimited', 'O(A*c+A/d+c)'),
        ('longest_consecutive', 'O(n) expected', 'O(n)'),
        ('count_pairs', 'O(n) expected', 'O(n)'),
        ('fib_naive / fib', 'O(2^n) bound', 'O(n)'),
        ('make_fib', 'O(1)', 'O(1)'),
        ('memoized fib', 'O(n), fresh cache', 'O(n)'),
        ('count_ways_bottom_up', 'O(A*c+c)', 'O(A+c)'),
        ('square', 'O(1)', 'O(1)'),
        ('main', 'fixed demonstrations', 'fixed demonstrations'),
    ]
    print('function name'.ljust(28), '|', 'time complexity'.ljust(24), '| space complexity')
    for name, time, space in rows:
        print(name.ljust(28), '|', time.ljust(24), '|', space)

# Naive Fibonacci repeats the same subproblems exponentially often; memoization
# computes each n once, yielding O(n) time and O(n) cache/stack space.
# longest_consecutive is already linear; caching rarely helps different lists,
# and constructing/hashing an immutable list key still takes O(n).
# Hash tables choose a bucket from a hash; lookup is O(1) on average, but many
# colliding keys can require O(n) work in the worst case.
# Memoizing a side-effecting function can suppress required effects; large,
# rarely reused arguments/results can consume memory with little benefit.
# max_size=3 has constant entry count, but not constant bytes for arbitrary
# argument/result sizes; frequent eviction can restore exponential recursion.
# For amount=10000 choose bottom-up: O(A) DP storage and no recursion-limit risk.
# Python integers grow: these usual Big O bounds assume unit-cost arithmetic;
# Fibonacci's bit complexity and cached integer storage exceed those bounds.
# Memoized functions preserve return values but intentionally mutate private
# caches/statistics; no analysis function prints or mutates caller-owned lists.

if __name__ == '__main__':
    main()
