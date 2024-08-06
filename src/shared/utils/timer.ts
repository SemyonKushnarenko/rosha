export default function timer(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms)); 
}