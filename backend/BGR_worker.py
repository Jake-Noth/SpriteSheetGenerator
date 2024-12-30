import os
import subprocess
from threading import Thread
import queue

task_queue = queue.Queue()

def process_queue(task_queue):
    while True:
        if task_queue.empty():
            print("Queue is empty. Stopping thread.")
            break  

        UUID = task_queue.queue[0]

        input_path = os.path.abspath(f'UUIDs/{UUID}/input')
        output_path = os.path.abspath(f'UUIDs/{UUID}/output')

        print(f"Processing UUID: {UUID}")

        command = [
            'python3', '-m', 'carvekit', 
            '-i', input_path, 
            '-o', output_path, 
            '--device', 'cpu', 
            '--pre', 'none', 
            '--post', 'fba', 
            '--net', 'tracer_b7', 
            '--batch_size', '10', 
            '--batch_size_seg', '5', 
            '--batch_size_mat', '1', 
            '--seg_mask_size', '640', 
            '--matting_mask_size', '2048', 
            '--trimap_dilation', '30', 
            '--trimap_erosion', '5', 
            '--trimap_prob_threshold', '231'
            ]

        try:
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

            if result.returncode == 0:
                print(f"Successfully processed UUID: {UUID}")
                print(result.stdout)
            else:
                print(f"Error processing UUID: {UUID}")
                print(result.stderr)

        except Exception as e:
            print(f"An error occurred while processing UUID {UUID}: {e}")

        task_queue.get()
        task_queue.task_done()

def start_worker():
    thread = Thread(target=process_queue, args=(task_queue,))
    thread.start()
    return thread  

def process_UUID(UUID):
    task_queue.put(UUID)
    if task_queue.qsize() == 1:
        start_worker()
