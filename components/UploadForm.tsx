'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, DEFAULT_VOICE } from '@/lib/constants';
import FileUploader from '@/components/FileUploader';
import VoiceSelector from '@/components/VoiceSelector';
import LoadingOverlay from '@/components/LoadingOverlay';
import CustomFormField from '@/components/CustomFormField';
import {useAuth, useUser} from "@clerk/nextjs";
import { toast } from 'sonner';
import {checkBookExists, createBook, saveBookSegments} from "@/lib/actions/book.actions";
import {useRouter} from "next/navigation";
import {parsePDFFile} from "@/lib/utils";
import {upload} from "@vercel/blob/client";

const UploadForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            category: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        if(!userId) {
           return toast.error("Please login to upload books");
        }

        setIsSubmitting(true);

        // PostHog -> Track Book Uploads...

        try {
            const existsCheck = await checkBookExists(data.title);

            if(existsCheck.exists && existsCheck.book) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${existsCheck.book.slug}`)
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            const pdfFile = data.pdfFile;

            const parsedPDF = await parsePDFFile(pdfFile);

            if(parsedPDF.content.length === 0) {
                toast.error("Failed to parse PDF. Please try again with a different file.");
                return;
            }

            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf'
            });

            let coverUrl: string;

            if(data.coverImage) {
                const coverFile = data.coverImage;
                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: coverFile.type
                });
                coverUrl = uploadedCoverBlob.url;
            } else {
                const response = await fetch(parsedPDF.cover)
                const blob = await response.blob();

                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                    contentType: 'image/png'
                });
                coverUrl = uploadedCoverBlob.url;
            }

            const book = await createBook({
                clerkId: userId,
                title: data.title,
                author: data.author,
                persona: data.persona,
                category: data.category,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: pdfFile.size,
            });

            if(!book.success) {
                toast.error(book.error as string || "Failed to create book");
                if (book.isBillingError) {
                    router.push("/subscriptions");
                }
                return;
            }

            if(book.alreadyExists) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${book.data.slug}`)
                return;
            }

            const segments = await saveBookSegments(book.data._id, userId, parsedPDF.content);

            if(!segments.success) {
                toast.error("Failed to save book segments");
                throw new Error("Failed to save book segments");
            }

            form.reset();
            router.push('/');
        } catch (error) {
            console.error(error);

            toast.error("Failed to upload book. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = async () => {
        // Only validate the fields present in step 1
        const isValid = await form.trigger(['pdfFile', 'coverImage']);
        if (isValid) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        setStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isMounted) return null;

    return (
        <>
            {isSubmitting && <LoadingOverlay />}

            <div className="new-book-wrapper">
                {/* Modern Step Indicator */}
                <div className="mb-10 mt-2 px-6">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-6 right-6 top-1/2 -z-10 h-1.5 -translate-y-1/2 bg-secondary rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
                                style={{ width: step === 1 ? '0%' : '100%' }}
                            />
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 bg-card px-2 z-10 transition-transform duration-300 hover:scale-105">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${step >= 1 ? 'bg-indigo-500 border-indigo-100 dark:border-indigo-900/50 text-white shadow-lg' : 'bg-background border-border text-muted-foreground'}`}>
                                1
                            </div>
                            <span className={`text-sm font-bold tracking-wide ${step >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`}>Upload</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 bg-card px-2 z-10 transition-transform duration-300 hover:scale-105">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${step >= 2 ? 'bg-indigo-500 border-indigo-100 dark:border-indigo-900/50 text-white shadow-lg' : 'bg-secondary border-border text-muted-foreground'}`}>
                                2
                            </div>
                            <span className={`text-sm font-bold tracking-wide ${step >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`}>Details</span>
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* --- STEP 1 --- */}
                        <div className={`space-y-8 transition-all duration-500 ${step === 1 ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-4'}`}>
                            <FileUploader
                                control={form.control}
                                name="pdfFile"
                                label="Book PDF File"
                                acceptTypes={ACCEPTED_PDF_TYPES}
                                icon={Upload}
                                placeholder="Click to upload PDF"
                                hint="PDF file (max 50MB)"
                                disabled={isSubmitting}
                            />

                            <FileUploader
                                control={form.control}
                                name="coverImage"
                                label="Cover Image (Optional)"
                                acceptTypes={ACCEPTED_IMAGE_TYPES}
                                icon={ImageIcon}
                                placeholder="Click to upload cover image"
                                hint="Leave empty to auto-generate from PDF"
                                disabled={isSubmitting}
                            />
                            
                            <Button type="button" onClick={handleNext} className="form-btn w-full mt-8 group">
                                Continue
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </Button>
                        </div>

                        {/* --- STEP 2 --- */}
                        <div className={`space-y-8 transition-all duration-500 ${step === 2 ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-4'}`}>
                            <CustomFormField
                                control={form.control}
                                name="title"
                                label="Title"
                                placeholder="ex: Rich Dad Poor Dad"
                                disabled={isSubmitting}
                            />

                            <CustomFormField
                                control={form.control}
                                name="author"
                                label="Author Name"
                                placeholder="ex: Robert Kiyosaki"
                                disabled={isSubmitting}
                            />

                            <CustomFormField
                                control={form.control}
                                name="category"
                                label="Category"
                                placeholder="ex: Tech, Finance, Productivity"
                                disabled={isSubmitting}
                            />

                            <FormField
                                control={form.control}
                                name="persona"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                        <FormControl>
                                            <VoiceSelector
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4 pt-4 mt-8 border-t border-border/50">
                                <Button type="button" onClick={handleBack} variant="outline" className="flex-1 py-6 text-base font-semibold border-2 rounded-xl transition-all hover:bg-secondary disabled:opacity-50" disabled={isSubmitting}>
                                    Back
                                </Button>
                                <Button type="submit" className="form-btn flex-2 shadow-lg hover:shadow-indigo-500/25" disabled={isSubmitting}>
                                    Begin Synthesis
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default UploadForm;